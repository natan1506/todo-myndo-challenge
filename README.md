# To-Do List App Test Myndo

Este é um projeto de um aplicativo de lista de tarefas (To-Do List) construído com tecnologias web modernas, com foco em uma experiência de usuário fluida, performance e capacidade de funcionamento offline.

## ✨ Funcionalidades

- Criação, edição e exclusão de tarefas.
- Marcar tarefas como concluídas.
- Definição de prioridade para tarefas (Baixa, Média, Alta).
- Persistência de dados local no navegador (Offline-first).
- Fila de sincronização para operações offline.
- Tema claro e escuro (light/dark mode).

## 🚀 Stack de Tecnologia

O projeto foi construído utilizando a seguinte stack:

- **Framework:** [React](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Gerenciador de Pacotes:** [pnpm](https://pnpm.io/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
- **Gerenciamento de Estado:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Persistência de Dados:** [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (através da biblioteca `idb`)
- **Validação de Formulários:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🔧 Decisões Técnicas

A escolha das tecnologias foi baseada em alguns princípios chave:

1.  **Performance e Developer Experience:** **Vite** foi escolhido por seu setup rápido, Hot Module Replacement (HMR) instantâneo e builds otimizadas. **pnpm** foi utilizado por sua eficiência no gerenciamento de dependências e uso de disco.

2.  **UI Robusta e Customizável:** **shadcn/ui** oferece uma coleção de componentes de alta qualidade, acessíveis e estilizáveis com TailwindCSS. Diferente de outras bibliotecas de componentes, ele permite que os componentes façam parte da sua codebase, facilitando a customização.

3.  **Gerenciamento de Estado Simples e Poderoso:** **Zustand** foi preferido em vez de soluções mais verbosas como Redux. Ele oferece uma API mínima e hooks para gerenciar o estado da aplicação de forma reativa e eficiente, sem a necessidade de `Context.Provider`.

4.  **Offline-First:** A aplicação foi projetada para funcionar offline. As tarefas são salvas localmente no **IndexedDB**, uma base de dados robusta do navegador. Todas as operações (criação, atualização, exclusão) são adicionadas a uma fila de sincronização (`syncQueue.ts`). Isso garante que nenhuma alteração seja perdida e permite que, no futuro, essas operações sejam enviadas para um backend quando a conexão for restabelecida.

## ⚙️ Instalação e Execução

Siga os passos abaixo para executar o projeto localmente.

**Pré-requisitos:**

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/installation)

**Passos:**

1.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

2.  **Execute o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```

Após executar o último comando, o projeto estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

Para teste offline necessário rodar build e preview

1.  **Gere o build:**

    ```bash
    pnpm build
    ```

2.  **Execute o preview:**
    ```bash
    pnpm preview
    ```

Após executar o último comando, o projeto estará disponível em `http://localhost:4173` (ou outra porta, se a 4173 estiver em uso).

Navegue até o DevTools do seu navegador, dentro da aba Network altere o "No throttling" para "Offline" desta forma seu navegador vai simular como se não tivesse internet
