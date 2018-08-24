/**
 * Some application-wide utility functions.
 */

 import { ChangeEvent } from 'react';

 /**
  * Converts event target alue to float.
  * 
  * @param e Event arguments to extract the value from
  */
 export function asFloat(e: ChangeEvent<HTMLInputElement>) {
     return parseFloat(e.target.value.trim());
 }

 /**
  * Converts event target alue to int.
  * 
  * @param e Event arguments to extract the value from
  */
 export function asInt(e: ChangeEvent<HTMLInputElement>) {
    return parseInt(e.target.value.trim(), 10);
}
