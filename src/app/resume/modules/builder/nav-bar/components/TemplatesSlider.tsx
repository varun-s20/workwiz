// eslint-disable-next-line import/no-unresolved
import '@splidejs/splide/css';
import React from 'react';
import Splide, { Splide as SplideCore } from '@splidejs/splide';
import { useEffect, useRef } from 'react';

import { AVAILABLE_TEMPLATES } from '../../../../helpers/constants';
import { Global } from '@emotion/react';
import Image from 'next/image';
import { useTemplates } from '../../../../stores/useTemplate';

export const TemplateSlider = () => {
  const templateIndex = useTemplates((state) => state.activeTemplate.id);
  console.log("Template Index: ", templateIndex);
  const targetElementRef = useRef<HTMLElement | null>(null);
  const splideInstanceRef = useRef<Splide | null>(null);

  useEffect(() => {
    const targetElement = targetElementRef.current;
    if (targetElement) {
      splideInstanceRef.current = new SplideCore(targetElement, {
        perPage: 1,
        pagination: false,
        gap: '0px',
        width: '100%',
        autoHeight: true,
        perMove: 1,
      });

      splideInstanceRef.current.mount();
    }

    return () => {
      splideInstanceRef.current && splideInstanceRef.current.destroy();
    };
  }, []);

  const onChangeTemplate = (templateId: string) => {
    useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES[templateId]);
    console.log("inside on change template: ",AVAILABLE_TEMPLATES[templateId])
  };

  return (
    <div>
      <section className="splide my-8 px-8" ref={targetElementRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {Object.keys(AVAILABLE_TEMPLATES).map((templateKey) => {
              const template = AVAILABLE_TEMPLATES[templateKey];
              console.log("Template ye hai: ", template)
              const isActive = template.id === templateIndex;
              console.log("Active: ", isActive)
              return (
                <TemplateSlide
                  key={template.id}
                  isActive={isActive}
                  id={template.id}
                  name={template.name}
                  thumbnail={template.thumbnail}
                  onChangeTemplate={onChangeTemplate}
                />
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export const TemplateSlide = ({
  isActive,
  id,
  name,
  thumbnail,
  onChangeTemplate,
}: {
  isActive: boolean;
  id: string;
  name: string;
  thumbnail: string;
  onChangeTemplate: (id: string) => void;
}) => {
  return (
    <li className="splide__slide flex justify-center px-2">
      <div
        className={`h-64 w-48 rounded border hover:cursor-pointer overflow-hidden relative ${
          isActive ? 'border-2 border-[#2E4052]' : 'border-[#A8B9CC]'
        }`}
        onClick={() => {
          onChangeTemplate(id);
          {console.log("On Click id: ",id)}
        }}
      >
        <Image src={thumbnail} alt={name} layout="fill" />

        {isActive && (
          <div className="absolute top-1 left-2 bg-white rounded-full">
            <Image src={'/icons/selected-tick.svg'} alt="logo" width="24" height="20" />
          </div>
        )}
      </div>
    </li>
  );
};
