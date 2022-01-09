import React from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faSkating, faSkiing, faSkiingNordic, faSnowboarding, faSnowplow } from '@fortawesome/free-solid-svg-icons';

const Example = () => (
    <div style={{ fontSize: '1.25rem' }}>
        <div><FontAwesomeSvgIcon fixedWidth icon={faSkating} style={{ background: 'DodgerBlue' }}/> Skating</div>
        <div><FontAwesomeSvgIcon fixedWidth icon={faSkiing} style={{ background: 'SkyBlue' }}/> Skiing</div>
        <div><FontAwesomeSvgIcon fixedWidth icon={faSkiingNordic} style={{ background: 'DodgerBlue' }}/> Nordic Skiing</div>
        <div><FontAwesomeSvgIcon fixedWidth icon={faSnowboarding} style={{ background: 'SkyBlue' }}/> Snowboarding</div>
        <div><FontAwesomeSvgIcon fixedWidth icon={faSnowplow} style={{ background: 'DodgerBlue' }}/> Snowplow</div>
    </div>
);

export default Example;
