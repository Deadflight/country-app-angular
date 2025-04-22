import { ICountry } from '../interfaces/country.interface';
import { ICountryByCapital } from '../interfaces/country.service.interfaces';

export class CountryMapper {
  static mapCountryResponseToCountryByCapital(
    response: ICountryByCapital
  ): ICountry {
    return {
      commonName: response.translations['spa']?.common || response.name.common,
      officialName:
        response.translations['spa']?.official || response.name.official,
      capital: response.capital[0],
      population: response.population,
      region: response.region,
      cca2: response.cca2,
      flag: response.flags.png,
      iconFlag: response.flag,
      currencies: Object.keys(response.currencies),
      languages: Object.keys(response.languages),
      borders: response.borders || [],
      subregion: response.subregion,
      area: response.area,
      timezones: response.timezones,
    };
  }

  static mapCountryResponseArrayToCountryToArray(
    response: ICountryByCapital[]
  ): ICountry[] {
    return response.map((country) =>
      this.mapCountryResponseToCountryByCapital(country)
    );
  }
}
