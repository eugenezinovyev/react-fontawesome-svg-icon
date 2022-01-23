import { VoidFunctionComponent } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faArrowRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const Example: VoidFunctionComponent = () => (
    <>
        <p>
            <FontAwesomeSvgIcon icon={ faQuoteLeft } size="sm" pull="left"/>
            <span>Your time is limited, so don&apos;t waste it living someone else&apos;s life. Don&apos;t be trapped by dogma – which is living with the results of other people&apos;s thinking.</span>
            &nbsp;&mdash;&nbsp;
            <i>Steve Jobs</i>
        </p>
        <p>
            <FontAwesomeSvgIcon icon={ faArrowRight } size="lg" pull="right" border/>
            <span>It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.</span>
            &nbsp;&mdash;&nbsp;
            <i>Charles Dickens, A Tale of Two Cities</i>
        </p>
    </>
);

export default Example;
