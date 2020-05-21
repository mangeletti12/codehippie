import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
import { Observable,  } from 'rxjs';
import { map } from 'rxjs/operators';
//
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';



export interface User {
  firstName: string;
  lastName: string;
}

export interface Question {
  date: string;
  question: string;
}

export interface Answer {
  answer: string;
  date: string;
  isPublic: boolean;
  questionId: string;
  userId: string;
}

export class UserAnswersAndQuestions {
  answers: string[];
  questions: string[];

  constructor() {
    this.answers = [];
    this.questions = [];
  }
}



@Component({
  selector: 'answers',
  templateUrl: './answers.component.html',
  //styleUrls: ['./global.component.css']
})
export class AnswersComponent implements OnInit {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<any>;
  userSelected: any;
  //
  answerCollection: AngularFirestoreCollection<Answer>;
  answersCollection: AngularFirestoreCollection<Answer>;
  answers: Observable<any>;
  //
  questionsDoc: AngularFirestoreDocument<Question>;
  userQandA: any[] = new Array();
  questionCollection: AngularFirestoreCollection<Question>;
  questions: Observable<any>;
  selectedUser: any;
  selectedQuestion: any;


  constructor(
    // public auth: AuthService,
    // private _router: Router,
    // private route: ActivatedRoute,
    private db: AngularFirestore,
  ) {

  }

  ngOnInit(): void {

    //
    this.getQuestions();

    this.getAnswers();

    this.getUsers();
  }

  //
  getQuestions() {
    this.questionCollection = this.db.collection('Questions');
    //Set a listener to receive data-change events.
    //When you set a listener, Cloud Firestore sends your listener an initial snapshot of the data, and then another snapshot each time the document changes.
    //this.users = this.usersCollection.valueChanges();

    //snapshotChanges() differs from the previous method because in addition to providing you with the document data,
    // it also returns other metadata, which includes the ID. Seems like a lot of work just to get a single ID, huh?
    this.questions = this.questionCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Question;
        const id = a.payload.doc.id;
        return { id, data };
      });
    }));

  }

  getAnswers() {
    this.answerCollection = this.db.collection('Answers');
    //Set a listener to receive data-change events.
    //When you set a listener, Cloud Firestore sends your listener an initial snapshot of the data, and then another snapshot each time the document changes.
    //this.users = this.usersCollection.valueChanges();

    //snapshotChanges() differs from the previous method because in addition to providing you with the document data,
    // it also returns other metadata, which includes the ID. Seems like a lot of work just to get a single ID, huh?
    this.answers = this.answerCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Answer;
        const id = a.payload.doc.id;
        return { id, data };
      });
    }));

  }

  getUsers() {
    this.usersCollection = this.db.collection('Users');
    //Set a listener to receive data-change events.
    //When you set a listener, Cloud Firestore sends your listener an initial snapshot of the data, and then another snapshot each time the document changes.
    //this.users = this.usersCollection.valueChanges();

    //snapshotChanges() differs from the previous method because in addition to providing you with the document data,
    // it also returns other metadata, which includes the ID. Seems like a lot of work just to get a single ID, huh?
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }


  //Get answers for user id
  getUsersAnswers(userId: any) {
    //Clear Array
    this.userQandA = [];

    //User Questions with Answers
    this.answersCollection = this.db.collection('Answers', ref => ref.where('userId', '==', userId));
    //
    this.answersCollection.snapshotChanges()
    .subscribe(data => {
      return data.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        //Get each question from the answer now
        // bummer that this is a seperate request, very chatty
        this.questionsDoc = this.db.collection('Questions').doc(data.questionId);
        //
        this.questionsDoc.valueChanges()
        .subscribe(ref => {
          //console.log(ref);
          //Push into array
          var uqa = {
            question: ref.question,
            answer: data.answer,
            dateAnswered: data.date,
          };
          this.userQandA.push(uqa);
        });
      });


    });
  }

  //
  selectUser(item) {
    console.log(item);
    this.selectedUser = item;
  }

  //
  selectQuestion(item) {
    console.log(item);
    this.selectedQuestion = item;
  }

  //
  addQuestion(question: string) {
    console.log(question);

    this.db.collection('Questions').add({
      question: question
    })
    .then( docRef => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch( error => {
      console.error("Error adding document: ", error);
    });

  }



  //
  addAnswer(answer: string) {
    console.log(answer);

    if(answer != "" && answer != undefined) {
      var questionId = this.selectedQuestion.id;
      var userId = this.selectedUser.id;

      //FIRST: check to see if this user already answered this question
      // if so, do an update, not an add
      this.db.collection('Answers', (ref) => ref
      .where('userId', '==', userId)
      .where('questionId', '==', questionId)
      .limit(1))
      .get()
      .subscribe(ans => {

        if(ans.size == 0) {
          console.log('INSERT');

          this.db.collection('Answers').add({
            answer: answer,
            date: null,
            isPublic: true,
            questionId: questionId,
            userId: userId,
          })
          .then( docRef => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch( error => {
            console.error("Error adding document: ", error);
          });

        }
        else {
          console.log('UPDATE');
          var answserId = ans.docs[0].id;
          //console.log(answserId);

          this.db.collection('Answers').doc(answserId).update({
            answer: answer,
            date: null,
            isPublic: true,
            //questionId: questionId,
            //userId: userId,
            })
            .then( docRef => {
                console.log("Document successfully updated!");
            })
            .catch( error => {
                console.error("Error adding document: ", error);
            });

        }
      });
    }
    else {
      alert("Gotta have an answer!");
    }

  }


}
