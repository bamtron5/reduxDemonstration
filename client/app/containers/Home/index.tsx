import * as React from 'react';
import * as Redux from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// UTIL
import injectReducer from './../../util/injectReducer';

// REDUX PARTS
import { toggleModal } from './actions';
import reducer from './reducer';
import { makeSelectHomePage, IState } from './selectors';

// COMPONENTS
import Button from './../../components/Button';
import Modal from './../../components/Modal';

declare interface IHomeDispatch {
  onToggleModal: (show: boolean) => Redux.Dispatch<() => void>
}

declare interface IHomeProps extends IHomeDispatch {
  homePage: {
    showModal: boolean;
  };
}

export class HomePage extends React.Component<IHomeProps> {
  public show: boolean = false;

  constructor(props: IHomeProps) {
    super(props);
  }

  public toggleModal = () => {
    this.props.onToggleModal(!this.props.homePage.showModal);
  };

  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div>
          Home Page
          <Button onClick={this.toggleModal}>Sign Up</Button>
        </div>
        <Modal show={this.props.homePage.showModal}>
          Hello World
        </Modal>
      </article>
    );
  }
}

const mapStateToProps = (state: IState) => createStructuredSelector({
  homePage: makeSelectHomePage(state)
});

function mapDispatchToProps(dispatch: any) {
  const dispatchToProps: IHomeDispatch = {
    onToggleModal: (show: boolean) => dispatch(toggleModal(show))
  };
  return dispatchToProps;
}

const withReducer = injectReducer({ key: 'homePage', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const composed = compose<React.ComponentClass<IHomeProps>>(
  withReducer,
  withConnect
);

export default composed(HomePage);
