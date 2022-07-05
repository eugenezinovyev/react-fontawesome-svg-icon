import { useEffect, useRef, useState, FunctionComponent } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

type Size = { width: number, height: number } | null;

const Example: FunctionComponent = () => {
    const [size, setSize] = useState<Size>(null);
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (ref.current) {
            const { width, height } = ref.current.getBoundingClientRect();
            setSize({ width, height });
        }
    }, []);

    return (
        <>
            <FontAwesomeSvgIcon ref={ ref } icon={ faCoffee } size="lg"/>
            <span>{ size && JSON.stringify(size) }</span>
        </>
    );
};

export default Example;
