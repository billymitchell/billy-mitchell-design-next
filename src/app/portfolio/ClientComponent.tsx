import React from 'react';

const ClientComponent = ({ uniqueDisciplines }) => {


    return (

        {
            uniqueDisciplines.map(discipline => (
                <a
                    key={discipline}
                    href={`?${discipline.toLowerCase().replace('&', 'and').replace(/\s/gi, '-')}`}
                    className="button"
                >
                    {discipline}
                </a>
            ))
        }

    );
};

export default ClientComponent;
