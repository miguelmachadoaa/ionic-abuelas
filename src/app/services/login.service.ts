import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { JsonSQLite } from 'jeep-sqlite/dist/types/interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private sqlite: SqliteService,
    private http: HttpClient
  ) { }

  async login(email:string, password:string) {
    // Sentencia para leer todos los registros
    let sql = 'SELECT * FROM usuarios where email = ? limit 1 ';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [email] // necesario para android
    }).then((response: capSQLiteValues) => {
      let users: string[] = [];

      // Si es IOS y hay datos, elimino la primera fila
      // Esto se debe a que la primera fila es informacion de las tablas
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // recorremos los datos
      for (const element of response.values) {
        const user = element;
        users.push(user);
      }
      return users;

    }).catch(err => Promise.reject(err))
  }

}
