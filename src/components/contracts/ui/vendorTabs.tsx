import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Tab {
  tabName: string
  tabValue: string
  tabContent: React.ReactNode
}

export default function VendorTabs({ tabs }: { tabs: Tab[] }) {
  return (
    <Tabs defaultValue={tabs[0]?.tabValue}>
      <TabsList className="mb-6">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.tabValue} value={tab.tabValue}>
            {tab.tabName}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.tabValue} value={tab.tabValue}>
          {tab.tabContent}
        </TabsContent>
      ))}
    </Tabs>
  )
}
