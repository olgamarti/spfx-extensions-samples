import * as React from 'react';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

const LOG_SOURCE: string = 'Dialog';

export default class DialogCommand extends React.Component<any, any> {

    @override
    public componentDidMount(): void {
        Log.info(LOG_SOURCE, 'React Element: mounted');
    }


    @override
    public render(): React.ReactElement<{}> {
        return (
            <div>
        <Dialog
          hidden={ this.state.hideDialog }
          onDismiss={ this._closeDialog }
          dialogContentProps={ {
            type: DialogType.largeHeader,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          } }
          modalProps={ {
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
          } }
        >
          <ChoiceGroup
            options={ [
              {
                key: 'A',
                text: 'Option A'
              },
              {
                key: 'B',
                text: 'Option B',
                checked: true
              },
              {
                key: 'C',
                text: 'Option C',
                disabled: true
              }
            ] }
            onChange={ this._onChoiceChanged }
          />
          <DialogFooter>
            <PrimaryButton onClick={ this._closeDialog } text='Save' />
            <DefaultButton onClick={ this._closeDialog } text='Cancel' />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

    

    private _showDialog() {
      this.setState({ hideDialog: false });
    }
  
    private _closeDialog() {
      this.setState({ hideDialog: true });
    }
  
    private _onChoiceChanged() {
      console.log('Choice option change');
    }
}