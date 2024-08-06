import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class CriasService {

  constructor(
    private sqlite: SqliteService
  ) { }

  async createCriasDetalle(consumo: string,mortalidad: string, fecha: string) {
    // Sentencia para insertar un registro
    let sql = 'INSERT INTO crias_detalle (consumo, mortalidad, fecha) VALUES(?, ?, ?)';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            consumo,
            mortalidad,
            fecha,
          ]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      // Si es web, debemos guardar el cambio en la webstore manualmente
      if (this.sqlite.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }

  async readCriasDetalle() {
    // Sentencia para leer todos los registros
    let sql = 'SELECT * FROM crias_detalle';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [] // necesario para android
    }).then((response: capSQLiteValues) => {
      let crias: string[] = [];

      // Si es IOS y hay datos, elimino la primera fila
      // Esto se debe a que la primera fila es informacion de las tablas
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // recorremos los datos
      for (const element of response.values) {
        const cria = element;
        crias.push(cria);
      }
      return crias;

    }).catch(err => Promise.reject(err))
  }

  async updateCriasDetalle(id: string, consumo: string, mortalidad: string, fecha: string, ) {
    // Sentencia para actualizar un registro
    let sql = 'UPDATE languages SET consumo=?, mortalidad = ?, fecha=? WHERE id=?';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            consumo,
            mortalidad,
            fecha,
            id
          ]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      // Si es web, debemos guardar el cambio en la webstore manualmente
      if (this.sqlite.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }

  async deleteCriasDetalle(id: string) {
    // Sentencia para eliminar un registro
    let sql = 'DELETE FROM crias_detalle WHERE id=?';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            id
          ]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      // Si es web, debemos guardar el cambio en la webstore manualmente
      if (this.sqlite.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }

  

}
