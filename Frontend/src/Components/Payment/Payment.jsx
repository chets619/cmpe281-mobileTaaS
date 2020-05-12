import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { Redirect } from 'react-router-dom';

class Payment extends Component {
    state = {}
    render() {
        if (!(this.props.location && this.props.location.state && this.props.location.state.amount))
            return <Redirect to='/billing' />

        return (
            <>
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Payments</h1>
                            <span>Make payments through paypal over here!</span>
                        </center>
                        <hr />
                    </div>

                    <div className="billing-container col-sm-4 mx-auto mt-5">
                        <PayPalButton
                            amount={this.props.location.state.amount}
                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                            onSuccess={(details, data) => {
                                alert("Transaction completed by " + details.payer.name.given_name);

                                // OPTIONAL: Call your server to save the transaction
                                return fetch("/paypal-transaction-complete", {
                                    method: "post",
                                    body: JSON.stringify({
                                        orderId: data.orderID
                                    })
                                });
                            }}
                            options={{
                                clientId: "AV7sp8CF_orgOKizylUvv7z6CyROuk-xAQE2HHaHYVo8QswDBUIETAvfgT9CNMhp3x7D6Tn2ZLFeJYiR"
                            }}
                        />
                    </div>
                </div>

            </>
        );
    }
}

export default Payment;