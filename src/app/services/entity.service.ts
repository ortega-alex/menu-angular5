import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class EntityService {
    public url: string = 'http://localhost:3000/';

    constructor(
        private _http: Http,
    ) { }

    login(objec: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + "login", JSON.stringify(objec), options)
            .toPromise().then(res => res.json()).catch(this.handleError);
    }

    getEntity(entity: string): Promise<any> {
        return this._http.get(this.url + entity)
            .toPromise().then(res => res.json()).catch(this.handleError);
    }

    saveEntity(entity: string, object: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + entity, JSON.stringify(object), options)
            .toPromise().then(res => res.json()).catch(this.handleError);
    }

    deleteEntity(entity: string, id: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(this.url + entity + "/" + id, options)
            .toPromise().then(res => res.json()).catch(this.handleError);
    }

    updateEntity(entity: string, id: any, object: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(this.url + entity + "/" + id, JSON.stringify(object), options)
            .toPromise().then(res => res.json()).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private _handleError(error: Response) {
        console.error(error);
        if (0 === error.status) {
            // TODO check if '0' is the correct status
            window.location.href = '/';
        } else {
            let ex = error.json();
            if (ex.message) {
                return console.log('ex-message: ' + JSON.stringify(ex.message));
            } else {
                return console.log('ex-error : ' + JSON.stringify(ex.error));
            }
        }
    }
}