import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSuggestionBoxValueInterface } from '@plentymarkets/terra-components';
import { AuthorsConfig } from '../data/authores.config';
import { StoragesConfig } from '../data/storages.config';
import { PublisherConfig } from '../data/publisher.config';

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

    public constructor(private _authorsConfig:AuthorsConfig,
                       private _storagesConfig:StoragesConfig,
                       private _publisherConfig:PublisherConfig)
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

        this._authorsConfig.authores.forEach(((res:any) => {
            this._authorValues.push
            (
                {
                    value:   res.authorId,
                    caption: res.authorFirstName + ' ' + res.authorLastName
                }
            );
        }));

        this._storagesConfig.storages.forEach(((res:any) => {
            this._storageValues.push
            (
                {
                    value:   res.storageId,
                    caption: res.storageName + ' - ' + res.storageType
                }
            );
        }));

        this._publisherConfig.publishers.forEach(((res:any) => {
            this._publisherValues.push
            (
                {
                    value:   res.publisherId,
                    caption: res.publisherName + ' - ' + res.publisherOrderNumber
                }
            );
        }));
    }
}
