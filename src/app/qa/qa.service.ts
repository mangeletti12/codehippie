import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QaService {
  usersCollection: AngularFirestoreCollection<any>;
  answersCollection: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore,
    ) {
  }


  getUsers() {
    // Set a listener to receive data-change events.
    // When you set a listener, Cloud Firestore sends your listener an initial snapshot of the data, and then another snapshot each time the document changes.
    // this.users = this.usersCollection.valueChanges();

    // snapshotChanges() differs from the previous method because in addition to providing you with the document data,
    // it also returns other metadata, which includes the ID. Seems like a lot of work just to get a single ID, huh?
    this.usersCollection = this.db.collection('Users');
    //
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { 'id': id, 'firstName': data.firstName, 'lastName': data.lastName };
        });
      })
    );

  }

  // Get answers for user id
  getUsersAnswers(user) {
    // User Questions with Answers
    this.answersCollection = this.db.collection('Answers', ref => ref.where('userId', '==', user.id));
    // console.log('answersCollection', this.answersCollection);
    return this.answersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          // const qId = data.questionId
          // qId.get().then(doc => {
          //   data['question'] = doc.data().question;
          // });

          // Get each question from the answers now
          // bummer that this is a seperate request, very chatty
          const questionsDoc = this.db.collection('Questions').doc(data.questionId);

          questionsDoc.valueChanges().subscribe(ref => {
            data['question'] = ref['question'];
          });

          return { 'id': id, data };

        });
      })
    );


  }


}
