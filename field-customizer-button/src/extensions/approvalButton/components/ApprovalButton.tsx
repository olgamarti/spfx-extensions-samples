import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import pnp from 'sp-pnp-js';
import styles from './ApprovalButton.module.scss';
import { SPPermission } from "@microsoft/sp-page-context";

export interface IApprovalButtonProps {
  disabled: boolean;
  checked: boolean;
  value: string;
  id: string;
  context: any;
}

export interface IApprovalButtonState {
 value: string;
 disabled: boolean;
}

const LOG_SOURCE: string = 'ApprovalButton';

export default class ApprovalButton extends React.Component<IApprovalButtonProps, IApprovalButtonState> {

  constructor(props){
    super(props);

    this.state ={
      value: this.props.value,
      disabled: this.props.disabled
    }

    this.onChange = this.onChange.bind(this);
  }

  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: ApprovalButton mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: ApprovalButton unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    //This method changes the look of the field on render with Office Fabric UI button.
    return (
      <DefaultButton
        primary={true}
        disabled={this.state.disabled}
        checked={this.props.checked}
        text={this.state.value}
        onClick={this.onChange}
      />
    );
  }

  private onChange(): void {

    let list = pnp.sp.web.lists.getByTitle(this.props.context.pageContext.list.title);
   
    list.items.getById(parseInt(this.props.id)).update({
        SPFXEstado: "Aprobado"
    }).then(i => {
        console.log(i);
      this.setState({value: "Aprobado", disabled: true})
    });
  }
}


