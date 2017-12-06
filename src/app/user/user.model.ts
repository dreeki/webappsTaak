import { Thread } from "../Thread/thread.model";

export class User{
    private _id: string;
    private _username: string;
    private _firstname: string;
    private _lastname: string;
    private _birthDate: Date;
    private _country: string;
    private _threads: Thread[];

    constructor(username: string, firstname: string, lastname: string, country: string, birthDate: Date = new Date(), id?: string, threads?: Thread[]){
        this._id = id || "0";
        this._username = username;
        this._firstname = firstname;
        this._lastname = lastname;
        this._birthDate = birthDate;
        this._country = country;
        this._threads = threads || new Array<Thread>();
    }

	public get id(): string {
		return this._id;
    }
    

	public get username(): string {
		return this._username;
	}
    

	public get firstname(): string {
		return this._firstname;
	}

	public get lastname(): string {
		return this._lastname;
	}

	public get birthDate(): Date {
		return this._birthDate;
	}
    

	public get country(): string {
		return this._country;
	}
    

	public get threads(): Thread[] {
		return this._threads;
	}

	public get aantalThreads(): Number{
		return this._threads.length;
	}

	public get age() {
		var today = new Date();
		var age = today.getFullYear() - this._birthDate.getFullYear();
		var m = today.getMonth() - this._birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < this._birthDate.getDate())) {
		  age--;
		}
		return age;
	  }
    
}