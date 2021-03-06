/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { registerLanguage } from '../_.contribution.js';
registerLanguage({
    id: 'liquid',
    extensions: ['.liquid', '.html.liquid'],
    aliases: ['Liquid', 'liquid'],
    mimetypes: ['application/liquid'],
    loader: function () { return import('./liquid.js'); }
});
