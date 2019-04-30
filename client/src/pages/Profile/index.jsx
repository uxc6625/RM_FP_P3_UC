import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import authActions from "../../actions/auth";
import './style.css';

import Header from '../../components/Header';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            current_password: '',
            new_password: '',
            confirm_password: '',
            password_confirmed: true,
            current_password_wrong: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmitPwd = this.onSubmitPwd.bind(this);
        this.onSubmitInfo = this.onSubmitInfo.bind(this);
    }

    componentDidMount() {
        this.setState({
            first_name: this.props.currentUser.first_name,
            last_name: this.props.currentUser.last_name,
            email: this.props.currentUser.email
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitPwd(e) {
        e.preventDefault();

        if (this.state.new_password !== this.state.confirm_password) {
            this.setState({ password_confirmed: false });
            window.location.reload();
        }
        
        const passwords = {
            current_password: this.state.current_password,
            new_password: this.state.new_password
        };

        this.props.UpdateUserPassword(passwords, this.props.currentUser._id, this.props.auth.token).then(res => {
            if (this.props.pwdChangeError !== undefined) {
                this.setState({ current_password_wrong: true });
            } else {
                window.location.reload();
            }
            this.props.history.push(`/profile`);
        });
    }

    onSubmitInfo(e) {
        e.preventDefault();

        const updatedUser = {
            _id: this.props.currentUser._id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
        };

        this.props.UpdateUserProfile(updatedUser).then(res => {
            this.props.history.push(`/profile`);
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container wrapper">
                    <div className="content-wrapper">
                        <section className="content-header">
                            <h1>Profile</h1>
                        </section>
                        <section className="content">
                            <div className="row">
                                <div className="col-sm-6">
                                    <form className="form-horizontal" onSubmit={this.onSubmitInfo}>
                                        <div className="box box-solid">
                                            <div className="box-header">
                                                <h3 className="box-title">Edit profile</h3>
                                            </div>
                                            <div className="box-body">
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">First name</label>
                                                    <div className="col-sm-9">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-info" />
                                                            </span>
                                                            <input type="text" name="first_name" className="form-control" onChange={this.onChange} value={this.state.first_name} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Last name</label>
                                                    <div className="col-sm-9">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-info" />
                                                            </span>
                                                            <input type="text" name="last_name" className="form-control" onChange={this.onChange} value={this.state.last_name} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Email</label>
                                                    <div className="col-sm-9">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-info" />
                                                            </span>
                                                            <input type="email" name="email" className="form-control" onChange={this.onChange} value={this.state.email} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary pull-right">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-sm-6">
                                    <form className="form-horizontal" onSubmit={this.onSubmitPwd}>
                                        <div className="box box-solid">
                                            <div className="box-header">
                                                <div className="box-header">
                                                    <h3 className="box-title">Change password</h3>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="form-group">
                                                    <label htmlFor="current_password" className="col-sm-3 control-label">Current password:</label>
                                                    <div className="col-sm-9">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-lock" />
                                                            </span>
                                                            <input type="password" name="current_password" onChange={this.onChange} className="form-control" placeholder="Current password" required />
                                                        </div>
                                                    </div>
                                                </div>

                                                {this.state.current_password_wrong === true ? (
                                                    <div className="form-group">
                                                        <label className="col-sm-3 control-label" />
                                                        <div className="col-sm-9">
                                                            <div className="input-group">
                                                                <span>{this.props.pwdChangeError}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : <span />}                                            

                                                <div className="form-group">
                                                    <label htmlFor="new_password" className="col-sm-3 control-label">New password:</label>
                                                    <div className="col-sm-9">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-lock" />
                                                            </span>
                                                            <input type="password" name="new_password" onChange={this.onChange} className="form-control" placeholder="New password" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Confirm new password:</label>
                                                    <div className="col-sm-9">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-lock" />
                                                            </span>
                                                            <input type="password" name="confirm_password" onChange={this.onChange} className="form-control" placeholder="Confirm new password" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.state.password_confirmed === false ? (
                                                    <div className="form-group">
                                                        <label className="col-sm-3 control-label" />
                                                        <div className="col-sm-9">
                                                            <div className="input-group">
                                                                <span>Password is mismathced.</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : <span /> }
                                                <button type="submit" className="btn btn-primary pull-right">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state.login });
const mapDispatchToProps = dispatch => bindActionCreators({ ...authActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
