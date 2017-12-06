import { SubThread } from './sub-thread/sub-thread.model';

export class Thread{
    private _id: string;
    private _title: string;
    private _description: string;
    private _date: Date;
    private _subThreads: SubThread[];
    private _username: string;
    private _likes: string[];

    constructor(title: string, description: string, date: Date = new Date(), user: string, id?: string, subThreads?: SubThread[], likes?: string[]){
        this._title = title;
        this._id = id || "0";
        this._description = description;
        this._date = date;
        this._subThreads = subThreads || new Array<SubThread>();
        this._username = user;
        this._likes = likes || new Array<string>();
    }

	public get id(): string {
		return this._id;
	}
    

	public get title(): string {
		return this._title;
    }

	public get username(): string {
		return this._username;
	}
    
    public get description(): string {
		return this._description;
	}

	public get descriptionBig(): string {
		return this._description.replace(/\n/g, "<br />");
	}
    

	public get date(): Date {
		return this._date;
    }
    

	public get subThreads(): SubThread[] {
		return this._subThreads;
    }
    

	public get likes(): string[] {
		return this._likes;
    }
    

	public set likes(value: string[]) {
		this._likes = value;
	}
    
    
    public get aantalLikes(): number{
        return this._likes.length;
    }
    

    public get postDate(): string{
        let date = this._date;
        let nowDate = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var minutes2 = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes2 + ' ' + ampm;
        if(date.getDate() === nowDate.getDate()){
          return "Today at " + strTime; 
        }else if(date.getDate() === nowDate.getDate() - 1){
            return "Yesterday at " + strTime;
        }else if(date.getDate() >= nowDate.getDate() - 7){
          return (nowDate.getDate() - date.getDate()) + " days ago at " + strTime;
        }else if(date.getFullYear() === nowDate.getFullYear()){
          return date.getDate() + "/" + date.getMonth() + " at " + strTime;
        }else {
          return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " at " + strTime;
        }
      }

    public get aantalReacties(): number{
        return this._subThreads.length;
    }
    
    toJSON(){
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            date: this._date,
            subThreads: this._subThreads
        }
    }
}