/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/domain/enum/pagination/paginationEnum')} ctx.paginationEnum
 */
module.exports = ({ paginationEnum }) => ({
    buildResult: ({ page, pages }) => {
        page = Number(page);
        pages = Number(pages);

        let pagination = [];
        const { OFFSET, LIMIT } = paginationEnum;

        for (let i = 1; i <= pages; i++) {
            pagination.push(i);
        }

        const index = pagination.indexOf(page);
        let start = index - OFFSET < 0 ? 0 : index - OFFSET;
        let end = index + OFFSET > pages ? pages : page + OFFSET;

        if (start === 0) {
            end = start + LIMIT;
        }

        if (pages - page < OFFSET) {
            start = pages - LIMIT;
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
