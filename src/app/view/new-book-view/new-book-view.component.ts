import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSuggestionBoxValueInterface } from '@plentymarkets/terra-components';
import { PhpConnectionHelper } from '../php-connection-helper/php-connection-helper';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'new-book-view',
    template: require('./new-book-view.component.html'),
    styles:   [require('./new-book-view.component.scss')],
})
export class NewBookViewComponent implements OnInit
{

    private _authorValues:Array<TerraSuggestionBoxValueInterface> = [];
    private _publisherValues:Array<TerraSuggestionBoxValueInterface> = [];
    private _storageValues:Array<TerraSuggestionBoxValueInterface> = [];

    public constructor(private _phpConnectionHelper:PhpConnectionHelper)
    {
    }

    public ngOnInit():void
    {
        this.initSuggestionBoxes();
    }

    private initSuggestionBoxes():void
    {
        this._authorValues.push
        (
            {
                value:   '',
                caption: ''
            }
        );
        this._publisherValues.push
        (
            {
                value:   '',
                caption: ''
            }
        );
        this._storageValues.push
        (
            {
                value:   '',
                caption: ''
            }
        );

        Observable.combineLatest(
            this._phpConnectionHelper.getAllAuthors(),
            this._phpConnectionHelper.getAllPublishers(),
            this._phpConnectionHelper.getAllStorages(),
            (authors:any, publishers:any, storages:any) =>
            {
                return {
                    authors:   authors.json(),
                    publishers: publishers.json(),
                    storages:  storages.json()
                };
            }
        ).subscribe((data:any) =>
        {
            data.authors.forEach(author =>
                {
                    console.log(author);
                }
            );
            data.publishers.forEach(publisher =>
                {
                    console.log(publisher);
                }
            );
            data.storages.forEach(storage =>
                {
                    console.log(storage);
                }
            );
        });
    }

}
