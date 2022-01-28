const functions = require("firebase-functions");
const firestore = require("@google-cloud/firestore");
const client = new firestore.v1.FirestoreAdminClient();

// Replace BUCKET_NAME
const bucket = "gs://firestore-backups-dtr";
const today = new Date();
const day = today.getDate();
const month = today.getMonth()+1; 
const year = today.getFullYear();

const currentDate = year + "-" + month + "-" + day;

exports.scheduledFirestoreExport = functions.pubsub
    .schedule("every 24 hours")
    .onRun((context) => {
      const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
      const databaseName =
        client.databasePath(projectId, "(default)");
      return client.exportDocuments({
        name: databaseName,
        outputUriPrefix: `${bucket}/dtr-backup-${currentDate}`,
        // Leave collectionIds empty to export all collections
        // or set to a list of collection IDs to export,
        // collectionIds: ["users", "posts"]
        collectionIds: [],
      })
          .then((responses) => {
            const response = responses[0];
            console.log(`Operation Name: ${response["name"]}`);
          })
          .catch((err) => {
            console.error(err);
            throw new Error("Export operation failed");
          });
    });
