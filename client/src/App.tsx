import { useCallback } from 'react';
import { AppLayout, Sidebar, MainContent } from './components';
import { useSubmissions, useSchematic } from './hooks';

const USER_ID = 'demo-user';

export function App() {
  const {
    submissions,
    selected,
    selectedId,
    isLoading,
    refresh,
    select,
  } = useSubmissions(USER_ID);

  const netlist = selected?.netlist ?? null;
  const schematicData = useSchematic(netlist);
  const validationErrors = selected?.validationErrors ?? [];

  const handleUploadSuccess = useCallback(async (id: string) => {
    await refresh();
    await select(id);
  }, [refresh, select]);

  const sidebar = (
    <Sidebar
      submissions={submissions}
      selectedId={selectedId}
      selectedNetlist={netlist}
      validationErrors={validationErrors}
      isLoading={isLoading}
      onUploadSuccess={handleUploadSuccess}
      onSelect={select}
    />
  );

  const main = <MainContent schematicData={schematicData} />;

  return (
    <AppLayout userId={USER_ID} sidebar={sidebar} main={main} />
  );
}
