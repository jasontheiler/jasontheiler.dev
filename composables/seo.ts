import {
  computed,
  ref,
  useContext,
  useMeta,
  useRoute,
} from "@nuxtjs/composition-api";

export type Seo = {
  title?: string;
  description?: string;
  image?: string;
};

export const useSeo = (seo?: Seo) => {
  const title = ref(seo?.title);
  const description = ref(seo?.description);
  const image = ref(seo?.image);

  const { $config } = useContext();
  const route = useRoute();

  const meta = computed(() => {
    const meta = [
      {
        hid: "og:url",
        name: "og:url",
        content: $config.baseUrl + route.value.path,
      },
    ];

    if (title.value) {
      meta.push({
        hid: "og:title",
        name: "og:title",
        content: title.value,
      });
    }

    if (description.value)
      meta.push(
        {
          hid: "description",
          name: "description",
          content: description.value,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: description.value,
        }
      );

    if (image.value)
      meta.push({
        hid: "og:image",
        name: "og:image",
        content: $config.baseUrl + image.value,
      });

    return meta;
  });

  useMeta(() => ({ title: title.value, meta: meta.value }));

  return {
    title,
    description,
    image,
  };
};
