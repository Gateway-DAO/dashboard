import SectionLabel from '@/app/(landing)/components/section-label';
import Wrapper from '@/app/(landing)/components/wrapper';
import PhoneMockup from '@/app/(landing)/components/svgs/phone-mockup';
import Button from '@/app/(landing)/components/button';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import styles from './for-users.module.scss';
import { joinClasses } from '@/app/(landing)/utils/function';
import { InView } from 'react-intersection-observer';
import { useLenis } from '@studio-freight/react-lenis';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';

const data = [
  {
    title: 'Secure Your Data',
    videoUrl: '/videos/issuance.webm',
  },
  {
    title: 'Share Your Data',
    videoUrl: '/videos/request.webm',
  },
]

export default function ForUsers() {
  const refVideos = useRef<(HTMLVideoElement | null)[]>([]);
  const refProgressBars = useRef<(SVGElement | null)[]>([]);
  const refMockupContainer = useRef<HTMLDivElement>(null);
  const refFirstTimeViewed = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      refVideos.current.forEach((video, index) => {
        if (video && refProgressBars.current[index]) {
          const progress = gsap.utils.mapRange(0, video.duration, 100, 176, video.currentTime);
          refProgressBars.current[index]!.style.strokeDasharray = String(progress);
        }
      });

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (!refVideos?.current?.length) return;

    refVideos.current.forEach((video, index) => {
      if (!video) return;

      if (index !== active) {
        gsap.killTweensOf(refProgressBars.current[index]);

        video!.pause();

        const tl = gsap.timeline();
        tl.to(refMockupContainer.current, { opacity: 0 }, 0)
        tl.to([refProgressBars.current[index], refVideos.current[index]], { opacity: 0 }, 0);
        tl.to([refVideos.current[active], refMockupContainer.current], { opacity: 1 })
        tl.set(refVideos.current[index], { currentTime: 0 });
        tl.set(refProgressBars.current[index], { strokeDasharray: 100 });
        tl.set(refProgressBars.current[index], { opacity: 1 });
      }
    })
  }, [active])

  const onChangeInview = (inView: boolean) => {
    if (inView && !refFirstTimeViewed.current) {
      refFirstTimeViewed.current = true;
      refVideos.current[active]!.play();
    }
  };

  const lenis = useLenis();

  useHeaderVariantDetection(sectionRef, 'light');

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper>
        <div className={styles.columns}>
          <div className={styles.content}>
            <SectionLabel variant='white' text='FOR USERS' />

            <h2 className={styles.title}>
              Secure your Identity and Reclaim Control
            </h2>

            <p className={styles.text}>
              Gateway’s Self Sovereign Identity allows
              individuals to control access to their information
              across the web.
            </p>

            <a href='https://mygateway.xyz/login' target='_blank'>
              <Button variant='contained' className={styles.button}>
                Control Your Identity
              </Button>
            </a>

            <InView onChange={onChangeInview}>
              <div className={styles.controls}>
                {data.map((item, index) => (
                  <div
                    key={index}
                    className={joinClasses(styles.control, active === index ? styles['control--active'] : '')}
                    onClick={() => {
                      setActive(index);
                      refVideos.current[index]!.play();

                      if (window.innerWidth < 969) {
                        lenis.scrollTo('#mockup', { offset: -100 });
                      }
                    }}
                  >
                    <button className={styles.control_button}>{item.title}</button>

                    <svg className={styles.spinner} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle opacity="0.2" cx="14" cy="14" r="12" stroke="#E6D5FA" strokeWidth="4"/>
                      <circle
                        ref={ref => refProgressBars.current[index] = ref}
                        className={styles.progressbar}
                        cx="14"
                        cy="14"
                        r="12"
                        stroke="#E6D5FA"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </InView>

          </div>

          <div className={styles.mockup} id='mockup'>
            <div className={styles.mockup_container} ref={refMockupContainer}>
              {data.map((item, index) => (
                <div key={index} className={styles.mockup_item}>
                  <PhoneMockup className={styles.mockup_vector} />
                  <video
                    controls={false}
                    muted={true}
                    className={styles.video}
                    src={item.videoUrl}
                    ref={ref => refVideos.current[index] = ref}
                    onEnded={() => {
                      gsap.delayedCall(2, () => {
                        const next = index + 1 === data.length ? 0 : index + 1;
                        setActive(next);
                        refVideos.current[next]!.play();
                      })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </Wrapper>
    </section>
  )
}
