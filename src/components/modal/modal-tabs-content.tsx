import { useMemo } from 'react';

import { Tabs, Tab } from '@mui/material';

import { TabPanel } from '../old-tabs/tab-panel';
import { useTab } from '../old-tabs/use-tab';
import { ModalTabProps, ModalContentView } from './ModalContentTypes';

type Props = {
  tabs: ModalTabProps[];
};

export default function ModalTabsContent({ tabs }: Props) {
  const { activeTab, handleTabChange } = useTab();

  const modalTabs = useMemo(() => {
    return tabs.filter((tab) => tab?.section?.imageUrl);
  }, [tabs]);

  return (
    <>
      {modalTabs.length > 1 && (
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            '& > div': {
              maxWidth: { xs: 250, md: 396 },
              margin: '0 auto',
              bottom: '-1px',
              position: 'relative',
            },
            borderBottom: `1px solid`,
            borderBottomColor: 'divider',
          }}
        >
          {modalTabs.map(({ key, label }) => (
            <Tab
              key={key}
              label={label}
              sx={(theme) => ({
                fontWeight: 700,
                px: 0,
                mr: theme.spacing(3),
                fontSize: 12,
              })}
            />
          ))}
        </Tabs>
      )}
      {modalTabs.map(({ key, section }, index) => {
        return (
          <TabPanel
            key={key}
            tabsId="modal-tabs"
            index={index}
            active={index === activeTab}
            sx={{
              py: 0,
              px: 0,
            }}
          >
            <ModalContentView {...section}>
              {section?.children}
            </ModalContentView>
          </TabPanel>
        );
      })}
    </>
  );
}
