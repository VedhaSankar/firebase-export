# firebase-export


## Create bucket and assign the following roles:
* Cloud Datastore Import Export Admin
* Owner or Storage Admin role on the bucket
* Firestore admin 

## Initialize the function:

```
firebase init functions --project PROJECT_ID
```

## Deploy your function
```
firebase deploy --only functions
```

