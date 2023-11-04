import {inject, Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private afAuth: AngularFireAuth = inject(AngularFireAuth);
  private fireStore: AngularFirestore = inject(AngularFirestore);

  userSubscription: Subscription | undefined | null;
  private _user: User | null = null;


  get user() {
    return this._user;
  }

  initAuthListener() {
    this.afAuth.authState.subscribe( fbUser => {
      if ( fbUser ) {
        // exists
        this.userSubscription = this.fireStore.collection('users').doc(fbUser.uid).valueChanges()
          .subscribe( (firestoreUser: any) => {
            this._user = firestoreUser as User;
            // this.store.dispatch( actions.setUser({ user }));
          });

      } else {
        // doesn't exist
        this._user = null;
        this.userSubscription?.unsubscribe();
        /*this.store.dispatch( actions.unSetUser() );
        this.store.dispatch( incomeExpenseActions.unSetItems() );*/
      }
    });
  }

  register(newUser: User) {
    const {email, password} = newUser;
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(({user}) => {
      const userTemp = {
        uid: user?.uid,
        ...newUser
      }
      // @ts-ignore
      delete userTemp.password;
      return this.fireStore.collection('users').doc(user?.uid).set(userTemp);
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }
}
