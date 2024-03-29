import { clientFields, ClientRow, idTypes, paymentTerms } from '@/components/Clients';
import ClientForm, { ClientFormValues } from '@/components/Clients/ClientForm/ClientForm';
import { CustomModal, CustomTable, LargeSpinner, Layout, TableSkeleton } from '@/components/Shared';
import { AddButton } from '@/components/Shared/IconButtons/AddButton/AddButton';
import { useCreateClientMutation, useGetClientsQuery } from '@/redux/services';
import { Box, Th } from '@chakra-ui/react';
import { ReactElement, useState } from 'react';

export default function ClientesPage(): ReactElement {
  const [displayModal, setDisplayModal] = useState(false);
  const { data: clients, isError, isLoading: isGetClientsLoading } = useGetClientsQuery();
  const [createClient, { isLoading }] = useCreateClientMutation();

  function onSubmit(data: ClientFormValues): void {
    const transformedData = { ...data, discount: Number(data.discount) };
    createClient(transformedData);
    setDisplayModal(false);
  }

  if (isGetClientsLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <LargeSpinner />;
  }

  return (
    <Box
      maxW="var(--maxPageWitdth)"
      m={['1rem', null, '1rem 2rem']}
      bgColor="brand.bgLight"
      borderRadius="3xl"
      boxShadow={'var(--boxShadow)'}
    >
      <CustomTable
        Headers={clientFields.map((header) => (
          <Th key={header.name} textAlign="center" p="1rem">
            {header.label}
          </Th>
        ))}
        Rows={clients?.map((dataRow) => (
          <ClientRow key={dataRow._id} client={dataRow} />
        ))}
        variant="simple"
        size="sm"
      />
      <CustomModal
        title="Crear Cliente"
        isDisplayed={displayModal}
        setDisplayModal={setDisplayModal}
        iconButton={
          <AddButton
            ariaLabel="crear nuevo cliente"
            size="sm"
            margin="1.5rem"
            onClick={(): void => setDisplayModal(true)}
          />
        }
      >
        <ClientForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          buttonText="Crear"
          idTypes={idTypes}
          paymentTerm={paymentTerms}
        />
      </CustomModal>
    </Box>
  );
}

ClientesPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};
