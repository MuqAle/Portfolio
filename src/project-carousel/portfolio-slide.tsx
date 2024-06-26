import { AnimatePresence, motion, useAnimate, useAnimation } from 'framer-motion'
import discHeader from '../images/channel-overlay/portfolio-channel/disc-header.svg'
import disc from '../images/channel-overlay/portfolio-channel/insert-disc.svg'
import ZoomContext from '../context/zoom-context'
import { useContext, useEffect } from 'react'
import { useImmer } from 'use-immer'



const PortfolioSlide = () => {

    const zoom = useContext(ZoomContext)
    const [animationDone, setAniamtionDone] = useImmer(false)
    const [discScope, discAnimate] = useAnimate()
    const [reflectionScope,reflectionAnimate] = useAnimate()


    const headerVariants = {
        initial:{
            y:'-100%'
        },
        animate :{
            y:0,
            transition:{
                duration:.2,
                delay:.5
            }
        },
        exit:{
            y:'-100%',
            transition:{
                duration:.2
            }
        },
    }
    const visibleDiscVariants = {

        discContainerAnimate:{
            y:['-23%',0],
            transition:{
                y:{
                    delay:.2,
                    duration:.55,
                    ease:'easeInOut'
                }
            }
        },

        discInsertLineInitial:{
            scaleX:0,
            scaleY:0
        },
        discInsertLineAnimate:{
            scaleX:1,
            scaleY:1,
            transition:{
                delay:2.5,
                duration:.15,
                ease:'linear'
            }
        },
        discInsertLineExit:{
            scaleX:0,
            scaleY:0,
            transition:{
                duration:.15,
                ease:'linear'
            }
        }
    }

    const discReflectionVariants = {
        discContainerAnimate:{
            y:['23%',0],
            transition:{
                y:{
                    delay:.2,
                    duration:.55,
                    ease:'easeInOut'
                }
            }
        },
        initial:{
            scaleY:-1,
        }
    }

    const discAnimation = async() => {
        await discAnimate(discScope.current, {
            opacity:[0,1],
            rotate:[270, 0,]
            },
            {
            opacity:{
                delay:.2,
                duration:.35
                },
            rotate:{
                delay:.2,
                duration:.8,
                ease: 'easeOut',
                }
            }
        )

        await discAnimate(discScope.current,{
            rotate:'15turn',
            y:'110%',
            },
            {
            rotate:{
                delay:.01,
                duration:2,
                ease:'easeIn'
                },
            y:{
                delay:1.5,
                duration:.5,
                ease:'easeOut'
                }
            }
        )
    }

    const reflectionAnimation = async() => {
        await reflectionAnimate(reflectionScope.current, {
            opacity:[0,1],
            rotate:[270, 0,]
            },
            {
            opacity:{
                delay:.2,
                duration:.35
                },
            rotate:{
                delay:.2,
                duration:.8,
                ease: 'easeOut',
                }
            }
        )

        await reflectionAnimate(reflectionScope.current,{
            rotate:'15turn',
            y:'-110%',
            },
            {
            rotate:{
                delay:.01,
                duration:2,
                ease:'easeIn'
                },
            y:{
                delay:1.5,
                duration:.5,
                ease:'easeOut'
                }
            }
        )

        setAniamtionDone(true)
    }

    useEffect(() => {
        discAnimation()
        reflectionAnimation()
    },[])

    return(
        <AnimatePresence>
{       (zoom && !animationDone) ? (
        <div className="overlay-slide disc-overlay">
            <motion.div className='disc-channel-header'
            variants={headerVariants}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}>
                <img src={discHeader} alt="" />
                <p>Disc Channel</p>
            </motion.div>
            <div className='disc-channel-body'>
                <div className='disc-bg'></div>
                <motion.div className='disc-container insert'
                variants={visibleDiscVariants}
                animate={'discContainerAnimate'}>
                <img className='insert-disc' src={disc} ref={discScope} alt="blue cd" />
                </motion.div>
                <div className='disc-shadow'></div>
                <motion.div className='disc-insert-line'
                variants={visibleDiscVariants}
                initial={'discInsertLineInitial'}
                animate={'discInsertLineAnimate'}
                exit={'discInsertLineExit'}
                ></motion.div>
                <motion.div className='disc-container reflection'
                variants={discReflectionVariants}
                animate={'discContainerAnimate'}>
                    <motion.img className='insert-disc-reflection' src={disc} ref={reflectionScope} alt="reflection of blue cd"
                    initial={'initial'}
                    variants={discReflectionVariants} />
                </motion.div>
                
            </div>
        </div>
        )
        :
        <div></div>
    }
        </AnimatePresence>
    
    )
}

export default PortfolioSlide 