export default [{
    name: 'Container',
    children: [{
        name: 'Grid',
        props: {
            container: true,
        },
        children: [{
                name: 'Grid',
                props: {
                    item: true,
                },
            },
            {
                name: 'Grid',
                props: {
                    item: true,
                },
            },
            {
                name: 'Grid',
                props: {
                    item: true,
                },
            }
        ]
    }]
}]