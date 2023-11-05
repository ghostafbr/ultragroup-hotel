import {inject, Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private afAuth: AngularFireAuth = inject(AngularFireAuth);
  private fireStore: AngularFirestore = inject(AngularFirestore);
  private messageService: MessageService = inject(MessageService);

  userSubscription: Subscription | undefined | null;
  private _user: User | null = null;
  private router: Router = inject(Router);

  user$ = new BehaviorSubject<User | null>(null);


  get user() {
    return this.user$.getValue();
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      if (fbUser) {
        this.userSubscription = this.fireStore.collection('users').doc(fbUser.uid).valueChanges()
          .subscribe((firestoreUser: any) => {
            this._user = firestoreUser as User;
          });

      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
      }
    });
  }

  async register(newUser: User) {
    const {email, password} = newUser;
    const {user} = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const userTemp = {
      uid: user?.uid,
      ...newUser
    };
    // @ts-ignore
    delete userTemp.password;
    return await this.fireStore.collection('users').doc(user?.uid).set(userTemp);
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this._user = null;
    this.user$.next(null);
    localStorage.clear();
    this.userSubscription?.unsubscribe();
    return this.afAuth.signOut();
  }

  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }

}
