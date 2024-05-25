Install tesp-app from helm chart in default namespace app-test\
helm install app-test test-app-[version].tgz\
or in custom namespace qa\
helm install app-qa test-app-[version].tgz  --namespace [namespace] --create-namespace
