import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCountry',
})
export class CurrencyCountryPipe implements PipeTransform {

  transform(value: number, country: string): any {
    let result;

    if (['AR', 'CA', 'CL', 'US'].includes(country)) {
      result = `$${value.toFixed(2)}`;
    } else if (['FR', 'DE'].includes(country)) {
      result = `${value.toFixed(2)} €`;
    } else if (['BR'].includes(country)) {
      result = `R$ ${value.toFixed(2)}`;
    } else if (['GB'].includes(country)) {
      result = `£${value.toFixed(2)}`;
    } else if (['MX'].includes(country)) {
      result = `$${value.toFixed(2)}`;
    } else if (['RU'].includes(country)) {
      result = `${value} RUB`;
    } else if (['ZA'].includes(country)) {
      result = `R${value.toFixed(2)}`;
    }

    return result;
  }

}
