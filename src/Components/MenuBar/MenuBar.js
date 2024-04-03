import React, {useState, useEffect, useRef} from 'react';
import Animated, {useSharedValue, withTiming, Easing} from 'react-native-reanimated';
import {Bar, MenuLink, LinkText} from './styles.js';
import {Actions} from 'react-native-router-flux';
import {SvgXml} from 'react-native-svg'
import icons from './icons'

function MenuBar() {
    const [open, setOpen] = useState(false);
    const height = useSharedValue(0);
    const skipFirstRender = useRef(true);

    const handleMenu = () => {
      setOpen(!open);
    }

    const handleLink = (item) => {
        Actions.home({category: item});
    }

    useEffect(() => {
        if(skipFirstRender.current){
            skipFirstRender.current = false;
            return;
        }

        if(open)
            height.value = withTiming(240, {
                duration: 200,
                easing: Easing.linear
            });
        else
            height.value = withTiming(0, {
                duration: 200,
                easing: Easing.linear
            });
    }, [open])


    return(
        <>
            <Bar onPress={handleMenu}>
                <SvgXml xml={icons['menu']} width='55px' height='25px' />
            </Bar>   
            <Animated.View
                style={{
                    display: 'flex',
                    width: '100%',
                    height,
                    backgroundColor: 'rgb(37, 37, 37)',
                }}>
                {['All', 'Music', 'Funny', 'Sports', 'News', 'Other'].map((item) => {
                    return(
                            <MenuLink style={{                    
                                    borderColor: 'white',
                                    borderTopWidth: 1}}
                                    onPress={() => handleLink(item)}
                                    key={item}
                                    >
                                <LinkText>
                                    {item}
                                </LinkText>
                            </MenuLink>                            
                        )
                    })}
            </Animated.View>                 
        </>
    )    
}

export default MenuBar;