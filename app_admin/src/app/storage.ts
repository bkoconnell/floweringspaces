/**
 * Object to facilitate the use of localStorage for token
 */

import { InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
});