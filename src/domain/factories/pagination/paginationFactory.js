module.exports = () => ({
    buildResult: ({ page, pages }) => {
        page = Number(page);
        pages = Number(pages);

        let pagination = [];
        const offset = 2;
        const limit = 5;

        for (let i = 1; i <= pages; i++) {
            pagination.push(i);
        }

        const index = pagination.indexOf(page);
        let start = index - offset < 0 ? 0 : index - offset;
        let end = index + offset > pages ? pages : page + offset;

        if (start === 0) {
            end = start + limit;
        }

        if (pages - page < offset) {
            start = pages - limit;
        }

        pagination = pagination.slice(start, end).map((pg) => (pg === page ? `**${pg}**` : String(pg)));

        if (!['1', '**1**'].includes(pagination[0])) {
            pagination.unshift('...');
        }

        if (![String(pages), `**${pages}**`].includes(pagination[pagination.length - 1])) {
            pagination.push('...');
        }

        return { pagination };
    }
});
