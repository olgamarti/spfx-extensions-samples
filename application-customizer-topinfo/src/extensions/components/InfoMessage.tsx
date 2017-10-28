import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import pnp from 'sp-pnp-js';
import { SPPermission } from "@microsoft/sp-page-context";
import * as React from 'react';
import { IInfoMessageProps } from './IInfoMessage';
import { IInfoMessageState } from './IInfoMessage';

const LOG_SOURCE: string = 'InfoMessage';

export default class InfoMessage extends React.Component<IInfoMessageProps, IInfoMessageState> {

    constructor(props) {
        super(props);

        this.state = {
            loadMessage: true,
            message: ""
        }

        this.showMessage = this.showMessage.bind(this);
    }

    @override
    public componentDidMount(): void {
        Log.info(LOG_SOURCE, 'React Element: InfoMessage mounted');
        this.showMessage();
    }

    @override
    public componentWillUnmount(): void {
        Log.info(LOG_SOURCE, 'React Element: InfoMessage unmounted');
    }

    @override
    public render(): React.ReactElement<{}> {
        //This method changes the look of the field on render with Office Fabric UI button.
        return (
            <div>
                <div className="ms-bgColor-themeDark ms-fontColor-white">
                    <i className="ms-Icon ms-Icon--Info" aria-hidden="true"></i>
                    {this.state.message}
                </div>
            </div>
        );
    }

    private showMessage(): void {
        let message: string;
        let list = pnp.sp.web.lists.getByTitle("TopMessages");

        list.items.filter("Show eq '1'").get().then(item => {
            console.log(item[0].Title);
            this.setState({ ...this.state, message: item[0].Title});
        });
    }
}


