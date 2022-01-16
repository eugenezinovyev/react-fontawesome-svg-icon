import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const Example = () => {
    const [size, setSize] = useState(null);
    const ref = useRef();
    
    useEffect(() => {
        const { width, height } = ref.current.getBoundingClientRect();
        setSize({ width, height });
    }, []);
    
    return (
        <>
            <FontAwesomeSvgIcon ref={ref} icon={faCoffee} size="lg"/>
            <span>{size && JSON.stringify(size)}</span>
        </>
    );
};

export default Example;
