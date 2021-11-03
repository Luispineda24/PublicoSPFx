import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TestWebPartStrings';
import Test from './components/Test';
import { ITestProps } from './Interfaces/ITestProps';
import axios from 'axios';

export interface ITestWebPartProps {
  description: string;
}

export default class TestWebPart extends BaseClientSideWebPart<ITestWebPartProps> {
  private readonly descrip: string = 'Paises del Mundo';
  private temPaises: any[] = [];

  public render(): void {
    this.consultarServicio();
  }

  /**
   * Funcion para Consultar el serivio
   */
  private consultarServicio(): void {
    let array: any;
    axios.get('https://restcountries.com/v2/all')
      .then((response) => {
        this.temPaises = response.data;
        this.ShowInfo();
      })
      .catch((error) => {
        array = [error];
      });
  }

  /**
   * Funcion para Pintar la info
   */
  ShowInfo() {
    const element: React.ReactElement<ITestProps> = React.createElement(
      Test,
      {
        description: this.descrip,
        paisesInfo: this.temPaises
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
