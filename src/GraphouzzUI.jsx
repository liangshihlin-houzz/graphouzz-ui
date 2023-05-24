import { useExplorerPlugin } from '@graphiql/plugin-explorer';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import { parse, print } from 'graphql';
import React, { useEffect, useState } from 'react';

import 'graphiql/graphiql.css';
import '@graphiql/plugin-explorer/dist/style.css';

import './GraphouzzUI.css';

const fetcherOptions = {
    // url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    url: 'http://localhost:3333/graphiql-api',
    fetch: async (url, options) => {
        console.log('URL:', url);
        console.log('options:', options);

        // if (typeof options.body === 'string') {
        //     let body = options.body;
        //     try {
        //         body = JSON.parse(options.body);
        //         if (!Object.prototype.hasOwnProperty.call(body, 'query')) {
        //             options.body = {
        //                 query: options.body,
        //             };
        //         }
        //     } catch(e) {
        //         console.log('String is a GraphQL query:', e);
        //     }
        // }

        const response = await fetch(url, Object.assign(options, { method: 'POST', mode: 'no-cors' }));

        console.log('Response:', JSON.parse(JSON.stringify(response)));
        console.log('Response headers:', response.headers);

        return response
    },
};
const fetcher = createGraphiQLFetcher(fetcherOptions);

export default function GraphouzzUI() {
    const [query, setQuery] = useState(print(parse(`
        query GetDesign{
            getDesignById (id: 178543389) {
                photo {
                    id
                }
                isLocked
                editable
            }
        } 
    `)));

    const explorerPlugin = useExplorerPlugin({
        query,
        onEdit: setQuery,
        showAttribution: true,
    });

    const [results] = useState(null);

    useEffect(() => {
        console.log(results, '- has changed')
    }, [results]);

    return React.createElement(GraphiQL, {
        fetcher,
        query,
        onEditQuery: setQuery,
        plugins: [explorerPlugin],
    });
}
