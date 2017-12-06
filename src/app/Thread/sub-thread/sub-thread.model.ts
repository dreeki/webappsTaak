export class SubThread {
    private _id: string;
    private _description: string;
    private _date: Date;
    private _username: string;

    constructor(description: string, date: Date = new Date(), username: string, id?: string) {
        this._id = id || "0";
        this._description = description;
        this._date = date;
        this._username = username;
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


    public get id(): string {
        return this._id;
    }


    public get description(): string {
        return this._description.replace(/\n/g, "<br />");
    }


    public get date(): Date {
        return this._date;
    }


    public get username(): string {
        return this._username;
    }

    toJSON() {
        return {
            id: this._id,
            description: this._description,
            date: this._date,
        }
    }
}