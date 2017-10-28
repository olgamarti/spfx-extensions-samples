import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import * as strings from 'TopInfoApplicationCustomizerStrings';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import InfoMessage from './../components/InfoMessage'
import styles from './../components/styles.module.scss';

import { IInfoMessageProps } from './../components/IInfoMessage';

const LOG_SOURCE: string = 'TopInfoApplicationCustomizer';

export interface ITopInfoApplicationCustomizerProperties {
  Top: string;
  Bottom: string;
  listname: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TopInfoApplicationCustomizer
  extends BaseApplicationCustomizer<ITopInfoApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Added to handle possible changes on the existence of placeholders.
    //this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    // Call render method for generating the HTML elements.
    this._renderPlaceHolders();
    return Promise.resolve<void>();
  }

  private _renderPlaceHolders(): void {

    console.log('HelloWorldApplicationCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',
    this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.Top;
        if (!topString) {
          topString = '(Top property was not defined.)';
        }

        const elem: React.ReactElement<IInfoMessageProps> = React.createElement(InfoMessage, {
          listName: this.properties.listname
        });
        ReactDOM.render(elem, this._topPlaceholder.domElement);
      }
    }
  }

  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
