import { useEffect, useRef, useState } from 'react';

import Button from '@/app/(landing)/components/button';
import Fingerprint from '@/app/(landing)/components/icons/fingerprint';
import Issue from '@/app/(landing)/components/icons/issue';
import Manage from '@/app/(landing)/components/icons/manage';
import Own from '@/app/(landing)/components/icons/own';
import Replay from '@/app/(landing)/components/icons/replay';
import Verify from '@/app/(landing)/components/icons/verify';
import Modal from '@/app/(landing)/components/modal';
import Portal from '@/app/(landing)/components/portal';
import { default as LifecycleVector } from '@/app/(landing)/components/svgs/lifecycle';
import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';
import useMobileDetect from '@/app/(landing)/hooks/use-mobile.detect';
import animationData from '@/app/(landing)/json/pda-cycle-animation.json';
import { joinClasses } from '@/app/(landing)/utils/function';
import gsap from 'gsap';
import lottie, { AnimationItem } from 'lottie-web';
import { InView } from 'react-intersection-observer';
import Slider from 'react-slick';

import styles from './lifecycle.module.scss';

const steps = [
  {
    icon: Issue,
    title: 'Issue',
    text: 'Entities and users can issue you private data assets (PDAs). ',
  },
  {
    icon: Own,
    title: 'PDA',
    text: 'An encrypted, chain agnostic asset that enables compliant data-sharing and ownership.',
  },
  {
    icon: Manage,
    title: 'Own',
    text: 'Decentralized storage and key management to permission data.',
  },
  {
    icon: Verify,
    title: 'Verify',
    text: 'Entities can request your private data to unlock better experience.',
  },
];

export default function Lifecycle() {
  const sectionRef = useRef<HTMLElement>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<AnimationItem>();
  const [modalActive, setModalActive] = useState(false);
  const { isMobile } = useMobileDetect();

  useHeaderVariantDetection(sectionRef, 'light');

  useEffect(() => {
    if (!animationContainerRef.current) return;
    lottieRef.current = lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData,
    });
    lottieRef.current.setSpeed(1.5);
  }, []);

  const handleInView = (inView: boolean) => {
    if (inView) {
      gsap.delayedCall(0.5, () => {
        lottieRef.current?.play();
      });
    } else if (isMobile) {
      lottieRef.current?.goToAndStop(0);
    }
  };

  const onClickReplay = () => {
    gsap.killTweensOf(animationContainerRef.current);
    const tl = gsap.timeline();
    tl.to(animationContainerRef.current, { autoAlpha: 0, duration: 0.2 });
    tl.add(() => {
      lottieRef.current?.goToAndStop(0);
    });
    tl.to(animationContainerRef.current, { autoAlpha: 1, duration: 0.2 });
    tl.add(() => {
      lottieRef.current?.play();
    });
  };

  const settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper>
        <div className={styles.head}>
          <div className={styles.title_container}>
            <Fingerprint className={styles.icon} />
            <h2 className={styles.title_text}>
              Private Data Assets — LifeCycle
            </h2>
          </div>

          <Button
            className={styles.button}
            variant="outlined"
            onClick={onClickReplay}
          >
            <Replay className={styles.button_icon} />
            <span>Replay</span>
          </Button>
        </div>
        <InView onChange={handleInView}>
          <div
            className={styles.animation_container}
            ref={animationContainerRef}
          />
        </InView>

        <Portal>
          <Modal
            className={styles.modal}
            active={modalActive}
            setActive={setModalActive}
          >
            <div className={styles.mobile_modal_vector_parent}>
              <LifecycleVector className={styles.mobile_modal_vector} />
            </div>
          </Modal>
        </Portal>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step_item}>
              <step.icon className={styles.step_icon} />
              <h3 className={styles.step_title}>{step.title}</h3>
              <p className={styles.step_text}>{step.text}</p>
            </div>
          ))}
        </div>

        <Button
          className={joinClasses(styles.button, styles.button_mobile)}
          variant="outlined"
          onClick={() => setModalActive(true)}
        >
          Click to expand
        </Button>

        <div
          className={joinClasses(styles.mobile_steps, 'slick-remove-overflow')}
        >
          <Slider {...settings}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={styles.step_item}
                style={{ width: '75vw' }}
              >
                <step.icon className={styles.step_icon} />
                <h3 className={styles.step_title}>{step.title}</h3>
                <p className={styles.step_text}>{step.text}</p>
              </div>
            ))}
          </Slider>
        </div>
      </Wrapper>
    </section>
  );
}
