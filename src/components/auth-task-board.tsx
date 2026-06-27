"use client";

import styles from "@/app/page.module.css";
import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { TaskDemo } from "@/components/task-demo";

export function AuthTaskBoard() {
  const auth = useFirebaseAuth();

  if (auth.isBootstrapping) {
    return (
      <section className={styles.board}>
        <div className={styles.panel}>
          <p className={styles.eyebrow}>Firebase Auth</p>
          <h1 className={styles.title}>Cargando sesion...</h1>
          <p className={styles.description}>
            Estamos verificando si ya existe una sesion activa en este navegador.
          </p>
        </div>
      </section>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <section className={styles.board}>
        <div className={styles.panel}>
          <p className={styles.eyebrow}>Firebase Auth</p>
          <h1 className={styles.title}>{auth.title}</h1>
          <p className={styles.description}>{auth.helperText}</p>

          <form className={styles.form} onSubmit={auth.onSubmit}>
            <label className={styles.label} htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              className={styles.input}
              type="email"
              value={auth.email}
              onChange={auth.onEmailChange}
              placeholder="correo@ejemplo.com"
            />

            <label className={styles.label} htmlFor="password">
              Contrasena
            </label>
            <input
              id="password"
              className={styles.input}
              type="password"
              value={auth.password}
              onChange={auth.onPasswordChange}
              placeholder="Minimo 6 caracteres"
            />

            {auth.errorMessage ? (
              <p className={styles.errorMessage}>{auth.errorMessage}</p>
            ) : null}

            <div className={styles.authActions}>
              <button
                className={styles.primaryButton}
                type="submit"
                disabled={auth.isSubmitting}
              >
                {auth.isSubmitting ? "Procesando..." : auth.submitLabel}
              </button>

              <button
                type="button"
                className={styles.ghostButton}
                onClick={
                  auth.mode === "login"
                    ? auth.setRegisterMode
                    : auth.setLoginMode
                }
              >
                {auth.toggleLabel}
              </button>
            </div>

            <div className={styles.socialAuth}>
              <div className={styles.divider}>
                <span>o continúa con</span>
              </div>

              <button
                type="button"
                className={styles.googleButton}
                onClick={auth.onSignInWithGoogle}
                disabled={auth.isSubmitting}
              >
                <svg
                  className={styles.googleIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M21.6 12.23c0-.79-.07-1.54-.2-2.27H12v4.3h5.39a4.6 4.6 0 0 1-2 3.01v2.5h3.24c1.9-1.75 2.97-4.33 2.97-7.54Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.41 13.91A6.01 6.01 0 0 1 6.41 10.1V7.52H3.07a10 10 0 0 0 0 12.78l3.34-2.59Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.04c1.47 0 2.79.5 3.83 1.49l2.87-2.87C16.96 2.99 14.7 2 12 2A10 10 0 0 0 3.07 7.52l3.34 2.59C7.2 7.8 9.4 6.04 12 6.04Z"
                  />
                </svg>
                <span>
                  {auth.isSubmitting ? "Procesando..." : "Sign in with Google"}
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className={styles.panel}>
          <div className={styles.listHeader}>
            <h2>Que queda listo</h2>
            <span>Email y contrasena</span>
          </div>

          <ul className={styles.taskList}>
            <li className={styles.taskItem}>
              <div className={styles.taskBody}>
                <p className={styles.taskText}>
                  El hook se encarga del registro, login, logout y del listener
                  de sesion.
                </p>
                <span className={styles.taskMeta}>
                  Todo el flujo de auth vive fuera de los componentes.
                </span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskBody}>
                <p className={styles.taskText}>
                  Firebase se inicializa una sola vez y usa variables
                  `NEXT_PUBLIC_...`.
                </p>
                <span className={styles.taskMeta}>
                  Solo falta conectar las credenciales reales del proyecto.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.authenticatedLayout}>
      <div className={styles.board}>
        <div className={styles.panel}>
          <div className={styles.authHeader}>
            <div>
              <p className={styles.eyebrow}>Sesion activa</p>
              <h1 className={styles.title}>Hola, {auth.currentUser?.email}</h1>
              <p className={styles.description}>
                Tu acceso ya esta gestionado por Firebase Authentication.
              </p>
            </div>

            <button
              type="button"
              className={styles.ghostButton}
              onClick={auth.onLogout}
              disabled={auth.isSubmitting}
            >
              Cerrar sesion
            </button>
          </div>
        </div>
      </div>

      <TaskDemo />
    </section>
  );
}
