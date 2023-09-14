import { useEffect, useRef } from 'react';

import Button from '@/app/(landing)/components/button';
import Fingerprint from '@/app/(landing)/components/icons/fingerprint';
import Issue from '@/app/(landing)/components/icons/issue';
import Manage from '@/app/(landing)/components/icons/manage';
import Own from '@/app/(landing)/components/icons/own';
import Replay from '@/app/(landing)/components/icons/replay';
import Verify from '@/app/(landing)/components/icons/verify';
import Wrapper from '@/app/(landing)/components/wrapper';
import { useHeaderContext } from '@/app/(landing)/contexts/header-context';
import animationData from '@/app/(landing)/json/pda-cycle-animation.json';
import LenisManager from '@/app/(landing)/utils/scroll';
import gsap from 'gsap';
import lottie, { AnimationItem } from 'lottie-web';
import { InView } from 'react-intersection-observer';

import styles from './lifecycle.module.scss';

const steps = [
  {
    icon: Issue,
    title: 'Issue',
    text: 'Entities and users can issue you private data assets (PDAs). ',
  },
  {
    icon: Own,
    title: 'Own',
    text: 'Your private date will be encrypted and you will have full control of it.',
  },
  {
    icon: Manage,
    title: 'Manage',
    text: 'Your private date will be encrypted and you will have full control of it.',
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
  const { setVariant } = useHeaderContext();

  useEffect(() => {
    LenisManager?.on('scroll', () => {
      if (!sectionRef.current) return;

      const bounds = sectionRef.current.getBoundingClientRect();
      const { bottom } = bounds;

      if (bottom >= 80) {
        setVariant('light');
      }
    });
  }, []);

  useEffect(() => {
    if (!animationContainerRef.current) return;
    lottieRef.current = lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData,
    });
  }, []);

  const handleInView = (inView: boolean) => {
    if (inView) {
      lottieRef.current?.play();
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

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step_item}>
              <step.icon className={styles.step_icon} />
              <h3 className={styles.step_title}>{step.title}</h3>
              <p className={styles.step_text}>{step.text}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
