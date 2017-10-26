import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';
import * as strings from 'ApprovalButtonFieldCustomizerStrings';
import ApprovalButton, { IApprovalButtonProps } from './components/ApprovalButton';
import { SPPermission } from "@microsoft/sp-page-context";

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IApprovalButtonFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'ApprovalButtonFieldCustomizer';

export default class ApprovalButtonFieldCustomizer
  extends BaseFieldCustomizer<IApprovalButtonFieldCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated ApprovalButtonFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "ApprovalButtonFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.
    // Get field value and add property from query string. Check user permissions to know if we have to diable the button.
    let value: string = event.fieldValue + " " + this.properties.sampleText;
    const id: string = event.row.getValueByName('ID').toString();
    let disabled: boolean = true;
    if (this.context.pageContext.list.permissions.hasPermission(SPPermission.editListItems) && event.fieldValue.toString() != "Aprobado") {
      disabled = false;
    }

    const approvalButton: React.ReactElement<{}> =
      React.createElement(ApprovalButton, { disabled: disabled, value: value, id: id, context: this.context } as IApprovalButtonProps);
    ReactDOM.render(approvalButton, event.domElement);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
