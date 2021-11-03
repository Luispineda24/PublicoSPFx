import * as React from 'react';
import { ITestProps } from '../Interfaces/ITestProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import Pais from '../Modulos/pais';

SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css")
SPComponentLoader.loadCss("./Test.css")
SPComponentLoader.loadScript("https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js")
SPComponentLoader.loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js")

export default class Test extends React.Component<ITestProps, {}> {

  public render(): React.ReactElement<ITestProps> {

    let element = (<div><h3>No hay datos para mostar.</h3></div>);

    this.context = window["webPartContextVisorAplicaciones"];
    if (this.props.paisesInfo.length > 0) {
      element = (
        <section id="team" className="pb-5">
          <div className="container">
            <h5 className="section-title h1">{this.props.description}</h5>
            <div className="row">
              {
                this.props.paisesInfo.map((i) => {
                  console.log(i.name);
                  return <Pais item={{ "flag": i.flag, "name": i.name, "languages": i.languages, "currencies": i.currencies != undefined || null ? i.currencies : [{ "name": "" }], "population": i.population }} />
                })
              }
            </div>
          </div>
        </section>);
    }
    return (element);
  }
}
