'use client';

export default function Dice({ number }) {
    const dots = {
        1: ['middle'],
        2: ['top-right', 'bottom-left'],
        3: ['top-right', 'middle', 'bottom-left'],
        4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        5: ['top-left', 'top-right', 'middle', 'bottom-left', 'bottom-right'],
        6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
    };

    const getDotPosition = (position) => {
        switch(position) {
            case 'top-left': return 'top-2 left-2';
            case 'top-right': return 'top-2 right-2';
            case 'middle-left': return 'top-1/2 left-2 -translate-y-1/2';
            case 'middle': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
            case 'middle-right': return 'top-1/2 right-2 -translate-y-1/2';
            case 'bottom-left': return 'bottom-2 left-2';
            case 'bottom-right': return 'bottom-2 right-2';
            default: return '';
        }
    };

    return (
        <div className="w-24 h-24 bg-white rounded-xl relative shadow-lg">
            {dots[number]?.map((position, index) => (
                <div 
                    key={index}
                    className={`absolute w-4 h-4 bg-black rounded-full ${getDotPosition(position)}`}
                />
            ))}
        </div>
    );
}
