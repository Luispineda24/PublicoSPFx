import * as React from 'react';
import { IpaisProps } from '../Interfaces/IpaisProps';
import Swal from 'sweetalert2';

export default class Pais extends React.Component<IpaisProps>{
    private open(name, flag: any): void {
        Swal.fire({
            title: '<strong>' + name + '</strong>',
            icon: 'info',
            html: '<img className=" img-fluid" src=' + flag + ' alt="card image" />',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
        })
    }
    public render(): React.ReactElement<IpaisProps> {
        return (

            <div className="col-xs-12 col-sm-6 col-md-4">
                <div className="image-flip" >
                    <div className="mainflip flip-0">
                        <div className="frontside">
                            <div className="card">
                                <div className="card-body text-center">
                                    <p><img className=" img-fluid" src={this.props.item.flag} alt="card image" /></p>
                                    <h4 className="card-title">{this.props.item.name}</h4>
                                    <p className="card-text">Idiomas: {this.props.item.languages.map(l => l.name += ' ')}.</p>
                                    <p className="card-text">Monedas: {this.props.item.currencies.map(m => m.name += ' ')}.</p>
                                    <p className="card-text">Habitantes: {this.props.item.population}.</p>
                                    <a href="#" className="btn btn-primary btn-sm" onClick={() => this.open(this.props.item.name, this.props.item.flag)}><i className="fa fa-plus">Info</i></a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}
